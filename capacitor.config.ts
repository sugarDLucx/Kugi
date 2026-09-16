import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "ph.kugi.mobile",
  appName: "Kugi",
  webDir: "out",
  server: {
    androidScheme: "https",
  },
};

export default config;
