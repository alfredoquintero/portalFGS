<!-- %@ page language="java" contentType="text/html; charset=ISO-8859-1"
 pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Bootstrap Form With Spring Mvc Example</title>
<link type="text/css" href="${pageContext.request.contextPath}/resources/dist/css/bootstrap.css" rel="stylesheet"/>
</head>
<body>
 <div class="container-fluid">
  <div class="row-fluid">
   <div class="span12">
    <fieldset>
    <legend>Bootstrap Form With Spring Mvc Example</legend>
    <form class="form-horizontal" method="post" action='employee/add.htm' name="employeeForm" id="employeeForm">
     <div class="control-group">
      <label class="control-label">First Name</label>
      <div class="controls">
       <input type="text" name="firstName" id="firstName" title="First Name" value="">
      </div>
     </div>
     <div class="control-group">
      <label class="control-label">Last Name</label>
      <div class="controls">
       <input type="text" name="lastName" id="lastName" title="Last Name" value="">
      </div>
     </div>
     <div class="control-group">
      <label class="control-label">Email</label>
      <div class="controls">
       <input type="text" name="email" id="email" title="Email" value="">
      </div>
     </div>
     <div class="form-actions">
      <button type="submit" class="btn btn-success">Submit</button>
      <button type="button" class="btn">Cancel</button>
     </div>
    </form>
    </fieldset>
   </div>
  </div>
 </div>  
</body>
</html-->



<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="../../../../favicon.ico">

    <title>FGS</title>

    <!-- Bootstrap core CSS -->
    <link href="${pageContext.request.contextPath}/resources/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="${pageContext.request.contextPath}/resources/css/signin.css" rel="stylesheet">
  </head>

  <body>

    <div class="container">

      <form class="form-signin" method="post" action='employee/add.htm' name="employeeForm" id="employeeForm">
        <h2 class="form-signin-heading">Entrar al portal FGS</h2>
        <label for="username" class="sr-only">Usuario</label>
        <input type="text" name = "username" id="username" class="form-control" placeholder="Usuario" required autofocus>
        <label for="password" class="sr-only">Password</label>
        <input type="password" name="password" id="password" class="form-control" placeholder="Contraseña" required>
        <div class="checkbox">
          <label>
            <input type="checkbox" value="remember-me"> Remember me
          </label>
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Entrar</button>
      </form>

    </div> <!-- /container -->


    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="${pageContext.request.contextPath}/resources/assets/js/ie10-viewport-bug-workaround.js"></script>
  </body>
</html>
