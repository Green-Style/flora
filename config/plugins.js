
module.exports = ({ env }) => ({
  email: {
    config: {
      provider: 'sendgrid',
      providerOptions: {
        apiKey: env('SENDGRID_API_KEY'),
      },
      settings: {
        defaultFrom: 'jose.mariano01@fatec.sp.gov.br',
        defaultReplyTo: 'jose.mariano01@fatec.sp.gov.br',
        testAddress: 'jose.mariano01@fatec.sp.gov.br',
      },
    },
  },
});