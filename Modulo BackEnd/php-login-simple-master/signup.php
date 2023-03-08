<?php

  require 'database.php';

  $message = '';

  if (!empty($_POST['email']) && !empty($_POST['password'] && !empty($_POST['confirm_password']))) {

    $verify = $conn->prepare("SELECT * FROM users WHERE email = :email");
    $verify->bindParam(':email',$_POST['email']);
    $verify->execute();
    if($verify->rowCount() > 0){

      $message = 'Este usuario ya esta registrado';

    }else {
      
      if($_POST['password'] === $_POST['confirm_password']){

        $sql = "INSERT INTO users (email, password) VALUES (:email, :password)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':email', $_POST['email']);
        $password = password_hash($_POST['password'], PASSWORD_BCRYPT);
        $stmt->bindParam(':password', $password);
  
        if ($stmt->execute()) {
          $message = 'Nuevo Usuario Creado Satisfactoriamente';
        } else {
          $message = 'Lo sentimos, hubo un problema al crear tu cuenta';
        }
      } else {
        $message = 'La contraseña debe ser igual en los dos campos';
      }

    }
    
  }else {
    $message = 'Alguno de los campos está vacio';
  }
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Registrate</title>
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/style.css">
  </head>
  <body>

    <?php require 'partials/header.php' ?>

    <?php if(!empty($message)): ?>
      <p> <?php $message ?></p>
    <?php endif; ?>

    <h1>Registrate</h1>
    <span>o <a href="login.php">Inicia Sesión</a></span>

    <form action="signup.php" method="POST">
      <input name="email" type="text" placeholder="Ingresa tu email">
      <input name="password" type="password" placeholder="Ingresa tu Contraseña">
      <input name="confirm_password" type="password" placeholder="Confirma tu Contraseña">
      <input type="submit" value="Crear Cuenta">
    </form>

  </body>
</html>
