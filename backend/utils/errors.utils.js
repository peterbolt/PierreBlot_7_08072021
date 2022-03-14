module.exports.signUpErrors = (err) => {
  let errors = { pseudo: "", email: "", password: "" };
  console.log(err.message);

  if (err.message.includes(`pseudo`))
    errors.pseudo = "Pseudo incorrect (3 caractères minimum)";

  if (err.message.includes("email")) errors.email = "Email incorrect";

  if (err.message.includes("password"));
  errors.password =
    "Le mot de passe doit faire 6 caractères minimum, avoir au moins une lettre majuscule, une lettre minuscule et un chiffre";

  if (err.message.includes("email") && err.message.includes("existant"))
    errors.email = "Cet email est déjà enregistré";

  return errors;
};

module.exports.signInErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.message.includes("email")) errors.email = "Email inconnu";

  if (err.message.includes("password"))
    errors.password = "Le mot de passe ne correspond pas";

  return errors;
};

module.exports.uploadErrors = (err) => {
  let errors = { format: "", maxSize: "" };
  console.log(err);
  if (err.message.includes("invalid file"))
    errors.format = "Format incompatabile";

  if (err.message.includes("max size"))
    errors.maxSize = "Le fichier dépasse 500ko";

  return errors;
};

module.exports.updateErrors = (err) => {
  let errors = { password: "" };
  if (err.message.includes("password"))
    errors.password = "Le mot de passe doit faire 6 caractères minimum";

  return errors;
};
