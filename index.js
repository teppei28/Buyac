const Discord = require('discord.js')
const bot = new Discord.Client()
const low = require('lowdb')
const fileSync = require('lowdb/adapters/fileSync')

const adapter = new fileSync('database.json')
const db = low(adapter);

db.defaults({ Commande: [], Plateforme: []})
   .write()

var prefix = ("!");
var randnum = 0;

var giveall = db.get('Commande');
var myJson = JSON.stringify(giveall);

bot.on('ready', () =>{
    console.log('Bot Ready !');
});

bot.login('NDUxNzE1MTY1OTQwMDg4ODM0.DfTPrw.UnNcD3EfuGXqq_fBAgLN_qU9R6g');

bot.on('message', function(message) {

        if (message.content === '!commande'){
            message.reply("Merci, votre commande est en attente.")
        }


if (!message.content.startsWith(prefix)) return;
     var args = message.content.substring(prefix.length).split(" ");
     switch (args[0].toLowerCase()){

        case "commande":
        var value = message.content.substr(10);
        var author = message.author.tag;
        var number = db.get('Commande').map('id').value();
        var num = 1;
        console.log(value);
        message.author.sendMessage("**Votre commande a bien été prise en compte.**\n\nMaintenant envoyer sur l'adresse : BuyTeam@gmail.com\nLes preuves que vous avez bien payé.")
        message.delete(0);

        db.get('Commande')
           .push({ Commande: value, Acheteur: author})
           .write();
     };

     if(message.content === '!Acheteur'){
         role = message.guild.roles.find('name', 'Acheteur en attente')
         grade = message.guild.roles.find('name', 'Acheteur certifié')


         if(message.guild.roles.find('name', 'Acheteur en attente')){
            message.reply("Vous êtes désormais un Acheteur Certifié")
          message.member.removeRole(role)
          message.member.addRole(grade)
          message.delete(0);
        }
     }
     
})