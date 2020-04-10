pipeline {
    agent any

    stages {
	
        stage('Remove deployment') {
            steps {
                sh 'cp /home/pi/nikowiscom/habits/apihabits.jar /home/pi/nikowiscom/habits/backups/'
                sh 'cp -r /home/pi/nikowiscom/habits/html/. /home/pi/nikowiscom/habits/backups/html'
                sh 'rm -rf /home/pi/nikowiscom/habits/html/*'
                sh 'sh /home/pi/nikowiscom/habits/apihabits-stop.sh'
                sh 'rm -f /home/pi/nikowiscom/habits/apihabits.jar'
            }
        }
		
        stage('Build frontend') {
            steps {
                sh 'npm --prefix ./frontend install'
                sh 'npm --prefix ./frontend run build'
                archiveArtifacts artifacts: '**/build/*', excludes:'**/node_modules/**/*/*/', fingerprint: true
            }
        }
		
        stage('Build backend') {
            steps {
                sh 'mvn clean install -f ./api/pom.xml -Pprod'
                archiveArtifacts artifacts: '**/target/*.jar', fingerprint: true
            }
        }
		


        stage('Deploy frontend') {
            steps {
                sh 'cp -r ./frontend/build/. /home/pi/nikowiscom/habits/html'
            }
        }

        stage('Deploy backend') {
            steps {
                sh 'cp ./api/target/apihabits.jar /home/pi/nikowiscom/habits'
				sh 'sh /home/pi/nikowiscom/habits/apihabits-start.sh &'
            }
        }
		
    }
}
