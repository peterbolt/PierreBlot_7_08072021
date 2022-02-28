module.exports.signUpErrors = (err) => {
  let errors = { pseudo: "", email: "", password: "" };

  if (err.errors[0].message.includes("pseudo"))
    errors.pseudo = "Pseudo incorrect ou déjà pris";

  if (err.errors[0].message.includes("email")) errors.email = "Email incorrect";

  if (err.errors[0].message.includes("password"))
    errors.password = "Le mot de passe doit faire 6 caractères minimum";

  if (
    err.errors[0].message.includes("pseudo") &&
    err.errors[0].type.includes("unique")
  )
    errors.pseudo = "Ce pseudo est déjà pris";

  if (
    err.errors[0].message.includes("email") &&
    err.errors[0].type.includes("unique")
  )
    errors.email = "Cet email est déjà enregistré";

  return errors;
};

module.exports.signInErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.errors[0].message.includes("email")) errors.email = "Email inconnu";

  if (err.errors[0].message.includes("password"))
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
