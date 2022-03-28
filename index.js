const Client = require('discord.js-selfbot-v13')
const client = new Client()

const anigame = ["571027211407196161"];//Anigame ID
const config = require('./config.json')
client.on('messageCreate', async message => {
  if(anigame.includes(message.author.id)) {
    if(config.servers.includes(message.guild.id)) {
    message.embeds.forEach(async e => {
      if(!e.title) return;
      if(!e.footer) return;
      if(e.title.includes("What's this?") && e.footer.text.includes(`Click on the claim button first to claim this card!`)) {
        const label = 'Claim!'
        const row = message.components[0];
        const button = row.components.find(button_ => button_.label
        == label);
        if(!button) return;
        button.click(message);
        const hook = new WebhookClient({ url: config.webhook });
        const d = new Date();
        const x = d/1000;
        hook.send(`<t:${Math.floor(x)}t:> | Claimed card in [${message.channel.name}](${message.channel.url})`)
        console.log(`Claimed card in ${message.channel.name}`)
      }
    })
  }
  }
})

client.on('ready', async () => {
  console.log(`${client.user.tag} is ready to roll!`)
  
})
client.login(config.token)
