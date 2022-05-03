















// async function addRole() {
//       const departments = await function viewDepartments() {
//           con.query("SELECT name FROM departments")
//               .then( ([rows,fields]) => {
//                   console.log(rows);
//                   return rows
//               })
//               .catch(console.log)
//               .then( () => con.end());
//       };
//       const addRoles  = {[
//           {
//               type: 'input',
//               message: "What is the role's name?",
//               name: 'roleTitle'
//           },
//           {
//               type: 'input',
//               message: "What is the role's salary?",
//               name: 'roleSalary'
//           },
//           {
//               type: 'list',
//               message: "What is the role's department?",
//               name: 'roleDepartment',
//               choices: departments     
//           }
//       ]};
//       inquirer.prompt(prompts.addRoles).then((answers) => {
//           let newRole = new roleClass(answers.roleTitle, answers.roleDepartment, answers.roleSalary);
//           con.promise().query("INSERT INTO roles (title, department, salary) VALUES (?)", [answers.roleTitle, answers.roleDepartment, answers.roleSalary], (err, result) => {
//               if (err) {
//                   console.log(err);
//               }
//               return result;
//           })
//           .then( ([rows,fields]) => {
//               console.table(rows);
//           })
//           .catch(console.log)
//           .then( () => {
//               console.log(`Added ${answers.roleTitle} to the database`)
//               init();
//           });
//       });
//   } catch (err) {
//       console.log(err);
//   }
// };





// init();