import { useEffect } from 'react';

// Webhook URL của Google Apps Script
const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbwxMmx9aq3JVqW3jEd-jUl1ZUKvVk7JeastDi1S6dQQPi-N5veXh6nuZF-HsNYV9VYdSA/exec';

// Cache geo data để không gọi API nhiều lần trong 1 session
let geoCache = null;

/**
 * Lấy IP + vị trí địa lý qua ipapi.co (free, 1000 req/ngày)
 */
async function getGeoInfo() {
  if (geoCache) return geoCache;
  try {
    // Thử ipapi.co trước
    const res = await fetch('https://ipapi.co/json/', { mode: 'cors' });
    const data = await res.json();

    // Nếu bị rate-limit, ipapi.co trả về { error: true }
    if (data.error) throw new Error('rate limited');

    geoCache = {
      ip:      data.ip           || 'unknown',
      country: data.country_name || 'unknown',
      city:    data.city         || 'unknown',
      org:     data.org          || 'unknown',
    };
  } catch {
    try {
      // Fallback sang ip-api.com (1000 req/min, không cần key)
      const res2 = await fetch('https://ip-api.com/json/?fields=query,country,city,isp', { mode: 'cors' });
      const d2 = await res2.json();
      geoCache = {
        ip:      d2.query   || 'unknown',
        country: d2.country || 'unknown',
        city:    d2.city    || 'unknown',
        org:     d2.isp     || 'unknown',
      };
    } catch {
      geoCache = { ip: 'unknown', country: 'unknown', city: 'unknown', org: 'unknown' };
    }
  }
  return geoCache;
}

/**
 * Phân tích nguồn truy cập:
 * - UTM params nếu có trong URL
 * - document.referrer nếu có
 * - 'Direct' nếu không có gì
 */
function getSource() {
  const params      = new URLSearchParams(window.location.search);
  const utmSource   = params.get('utm_source');
  const utmMedium   = params.get('utm_medium');
  const utmCampaign = params.get('utm_campaign');

  if (utmSource) {
    return [utmSource, utmMedium, utmCampaign].filter(Boolean).join(' / ');
  }

  const ref = document.referrer;
  if (!ref) return 'Direct';

  try {
    const hostname = new URL(ref).hostname.replace('www.', '');
    if (/google/.test(hostname))           return 'Google';
    if (/facebook|fb\.com/.test(hostname)) return 'Facebook';
    if (/linkedin/.test(hostname))         return 'LinkedIn';
    if (/github/.test(hostname))           return 'GitHub';
    if (/twitter|x\.com/.test(hostname))   return 'Twitter/X';
    if (/zalo/.test(hostname))             return 'Zalo';
    return hostname;
  } catch {
    return ref;
  }
}

/** Phân loại thiết bị */
function getDevice() {
  const ua = navigator.userAgent;
  if (/iPad/i.test(ua)) return 'Tablet';
  if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) return 'Mobile';
  return 'Desktop';
}

/** Tên trình duyệt */
function getBrowser() {
  const ua = navigator.userAgent;
  if (/Edg\//i.test(ua))        return 'Edge';
  if (/OPR\/|Opera/i.test(ua))  return 'Opera';
  if (/CocCoc/i.test(ua))       return 'Cốc Cốc';
  if (/Chrome\//i.test(ua))     return 'Chrome';
  if (/Firefox\//i.test(ua))    return 'Firefox';
  if (/Safari\//i.test(ua))     return 'Safari';
  return 'Other';
}

/** Format thời gian VN */
function getTimeVN() {
  return new Date().toLocaleString('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  });
}

/**
 * Gửi sự kiện tracking đến Google Sheets (fail silently)
 * @param {'page_visit' | 'cv_view' | 'cv_download'} eventName
 */
export async function trackEvent(eventName) {
  try {
    const geo = await getGeoInfo();

    const eventLabels = {
      page_visit:  '🌐 Vào website',
      cv_view:     '👁 Xem CV',
      cv_download: '⬇ Tải PDF',
    };

    const payload = {
      time:     getTimeVN(),
      event:    eventLabels[eventName] ?? eventName,
      device:   getDevice(),
      browser:  getBrowser(),
      screen:   `${screen.width}×${screen.height}`,
      source:   getSource(),
      language: navigator.language || 'unknown',
      ip:       geo.ip,
      country:  geo.country,
      city:     geo.city,
      org:      geo.org,
    };

    fetch(WEBHOOK_URL, {
      method:  'POST',
      mode:    'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    }).catch(() => {});
  } catch {
    // Fail silently
  }
}

// Alias để CVPreviewModal không cần đổi tên import
export const trackCVEvent = trackEvent;

/**
 * Hook: gọi 1 lần duy nhất khi app mount → tracking lượt vào website
 */
export function usePageTracking() {
  useEffect(() => {
    trackEvent('page_visit');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
