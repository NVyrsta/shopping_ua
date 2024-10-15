import { ref } from 'vue';
import {
  addVisitorId,
  fetchVisitorByIpHash,
  fetchVisitorsCount
} from '@/app/core/plugins/firebase';
import CryptoJS from 'crypto-js';

const uniqueVisitors = ref(0);

const getHashedIP = ip => {
  return CryptoJS.SHA256(ip).toString();
};

const trackVisitor = async visitorIP => {
  const visitorHash = getHashedIP(visitorIP);
  const existingVisitor = await fetchVisitorByIpHash(visitorHash);
  if (!existingVisitor) {
    await addVisitorId(visitorHash);
  }
};

const getVisitorIP = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Error fetching IP:', error);
    return null;
  }
};

const fetchTotalVisitors = async () => {
  const count = await fetchVisitorsCount();
  uniqueVisitors.value = count !== null ? count : 0;
};

const initializeVisitorTracking = async () => {
  const visitorIP = await getVisitorIP();
  if (visitorIP) {
    await trackVisitor(visitorIP);
  }
  await fetchTotalVisitors();
};

export { uniqueVisitors, initializeVisitorTracking };
