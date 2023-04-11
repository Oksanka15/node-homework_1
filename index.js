
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");
const contacts = require("./contacts.js");
const { Command } = require("commander");
const chalk = require("chalk");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      console.table(await listContacts())
      break;

    case "get":
      const contact = await contacts.getContactById(id);
      if (!contact) {        
        return console.log(chalk.bgRed(`Contact with id ${id} not found!`));
      }
      console.log(chalk.blue('%s'), contact);
      break;
     

    case "add":
      await addContact(name, email, phone)
      break;

    case "remove":
      await removeContact(id)
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);