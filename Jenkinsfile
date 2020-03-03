pipeline {
    agent any

    stages {
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
                archiveArtifacts artifacts: '**/target/*.war', fingerprint: true
            }
        }
        
        stage('Remove deployment') {
            steps {
                sh 'cp -r /home/pi/apache-tomcat-9.0.30/webapps/. /home/pi/deployment-backup/'
                sh 'cp -r /home/pi/nginx-http-selfcare/. /home/pi/deployment-backup/'
                sh 'rm -rf /home/pi/nginx-http-selfcare/*'
                sh 'rm -rf /home/pi/apache-tomcat-9.0.30/webapps/selfcareapi.war'
                sh 'rm -rf /home/pi/apache-tomcat-9.0.30/webapps/selfcareapi'
            }
        }

        stage('Deploy frontend') {
            steps {
                sh 'cp -r ./frontend/build/. /home/pi/nginx-http-selfcare/'
            }
        }

        stage('Deploy backend') {
            steps {
                sh 'cp ./api/target/selfcareapi.war /home/pi/apache-tomcat-9.0.30/webapps'
            }
        }
    }
}
