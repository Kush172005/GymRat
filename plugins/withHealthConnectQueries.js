const { withAndroidManifest } = require('@expo/config-plugins');

const HEALTH_CONNECT_PKG = 'com.google.android.apps.healthdata';

module.exports = function withHealthConnectQueries(config) {
  return withAndroidManifest(config, (config) => {
    const manifest = config.modResults.manifest;
    if (!manifest.queries) manifest.queries = [{}];
    const q = manifest.queries[0];
    if (!q.package) q.package = [];
    const exists = q.package.some((p) => p.$?.['android:name'] === HEALTH_CONNECT_PKG);
    if (!exists) {
      q.package.push({ $: { 'android:name': HEALTH_CONNECT_PKG } });
    }
    return config;
  });
};
