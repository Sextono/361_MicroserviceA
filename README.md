# 361_MicroserviceA

Requesting and recieving data:

/create: send a http request to http://localhost:3002/create with a body including the username and password. The microservice will respond with a status code (201 if successful, 400 if failure)
  ex>
  url = "http://localhost:3002/create" 
  body = { "username": username, "password": password } 
  response = requests.post( 
      url, 
      data = json.dumps(body), 
      headers={"Content-Type": "application/json"} 
  ) 
  if response.status_code == 201: 
      return True 
  else: 
      return False


/login: send a http request to http://localhost:3002/login with a body including the username and password. The microservice will respond with a status code (200 if successful, 400 if failure) and a token if it is successful
  ex.     
  url = "http://localhost:3002/login" 
  body = { "username": username, "password": password } 
  response = requests.post( 
      url, 
      data = json.dumps(body), 
      headers={"Content-Type": "application/json"} 
  ) 
  if response.status_code == 200: 
      token = response.json() 
      return True 
  else:
      return False

/validate: send a http request to http://localhost:3002/validate with a body including token. The microservice will respond with a status code (200 if successful, 400 if failure)
  ex.     
  url = "http://localhost:3002/validate" 
  body = { "token" = jsotuw9eow2w } 
  response = requests.post( 
      url, 
      data = json.dumps(body), 
      headers={"Content-Type": "application/json"} 
  ) 
  if response.status_code == 200: 
      return True 
  else:
      return False

/logout: send a http request to http://localhost:3002/logout with a body including token. The microservice will respond with a status code (200 if successful, 400 if failure)
  ex.     
  url = "http://localhost:3002/logout" 
  body = { "token" = jsotuw9eow2w } 
  response = requests.post( 
      url, 
      data = json.dumps(body), 
      headers={"Content-Type": "application/json"} 
  ) 
  if response.status_code == 200: 
      return True 
  else:
      return False

    
