import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
 // ضروري باش يقرا الملفات من الرابط ديالك اللي فيه /dr.nora/
  images: {
    unoptimized: true, // ضروري لـ GitHub Pages حيت ماكيدعمش تحسين الصور ديال Next.js
  },
};

export default nextConfig;
