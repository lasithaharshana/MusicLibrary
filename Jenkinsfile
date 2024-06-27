pipeline {
   agent any
   
   stages {
      stage('Checkout git main branch.') {
         steps {
            checkout scm
         }
      }
      
      stage('Build and Run Docker Compose') {
         steps {
            script {
               sh 'docker-compose up -d --build'
            }
         }
      }
   }
}
