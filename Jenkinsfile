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
                sh 'mvn clean install -f /api/pom.xml'
                archiveArtifacts artifacts: '**/target/*.jar', fingerprint: true
            }
        }
    }
}
