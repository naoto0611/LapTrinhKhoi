// Setup for code to run
1. Requirement:
	+ Node: >= v18 (recommend v18.17.1)
	+ npm: recommend 9.6.7
2. Environment
	+ Visual studio code (recommend)
3. Step
	+ Open project in Visual studio code
	+ Open Terminal
	+ Run "npm install"
	+ Create .env file (same level with .src folder)
	+ Insert these lines into .env file
		///////////
		WEB_PORT=3000
		DB_CONNECT_KEY = 'postgres://postgres:1@localhost:5432/Block'
		JWT_SECRET='q]#A2UMr5"R}ILx(cJ4fiBn`,w8L0DK}8uakqdWlanS0FiLH<Yke-=yX/K"98AR'
		API_PORT=3015
		///////////
	+ Run "npm start" to run the project
	+ Open browser and insert "http://localhost:3000"
