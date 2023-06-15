export default () => ({
  port: parseInt(process.env.PORT, 10) || 8000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
  openAIService: {
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.ORGANIZATION_KEY
  }
});
