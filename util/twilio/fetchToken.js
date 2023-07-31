export default async (ctx, identity) => {
  try {
    const { data } = await ctx.post('/twilio/token', { identity })
    return data.token
  } catch (error) {
    console.error(`Could not get Twilio identity token for identity: ${identity}`)
    return null
  }
}
