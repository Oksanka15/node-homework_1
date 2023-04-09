const fs = require("fs").promises;
const path = require("path");
const chalk = require("chalk");
const {nanoid} = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts(){
 const contacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts)
};

async function getContactById(contactId){
 
    const contacts = await listContacts();
    const contact = contacts.find(contact => contact.id === contactId);
    if (!contact){
     console.log(chalk.bgYellow("Sorry, contact not found!"))
     return };
    console.log(chalk.green("Yes, contact found"), contact)
    };

    async function removeContact(contactId){
      const contacts = await listContacts();
      const updatedContacts = contacts.filter(
        (contact) => contact.id !== contactId
      );
  
      if (contacts.length === updatedContacts.length) {
        console.log(chalk.red("Sorry, there is no such contact!"));
        return;
      }
  
      await fs.writeFile(contactsPath, JSON.stringify(updatedContacts), "utf-8");
      console.log(chalk.green("Contact is successfully deleted!"))
    }
    async function addContact(name, email, phone){
      const contacts = await listContacts();
      const newContact = { id: nanoid(), name, email, phone };
      contacts.push(newContact);
      await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf-8");
      console.log(chalk.green("Contact is successfully created:"), newContact);
    }