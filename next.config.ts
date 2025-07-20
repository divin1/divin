
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['next-mdx-remote'],
  eslint: {
    dirs: ['src', 'tools'],
  },
}
 
export default nextConfig;
