#!/usr/bin/env groovy

pipeline {

    agent {
        docker {
            image 'node'
            args '-u root'
        }
    }

    stages {
        stage('Build') {
            steps {
//                script {
//                    currentBuild.displayName = "Some build"
//                    currentBuild.description = "A description of that build"
//                }
                echo 'Building...'
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing...'
                echo 'I think it worked!'
            }
        }

        stage{'Deploy'} {
            when {
                branch 'master'
            }
            steps {
                sshPublisher(
                        publishers: [sshPublisherDesc(
                                configName: 'Maelstrom Droplet',
                                transfers: [sshTransfer(execCommand: 'ls -la', remoteDirectory: '/srv/maelstrom')])
                        ]
                )

            }
        }
    }
}