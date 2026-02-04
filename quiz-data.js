// Base de données des questions pour les différents quiz
const quizData = {
    ccna: [
        {
            question: "Quelle est la plage d'adresses IP de classe C ?",
            answers: [
                "1.0.0.0 à 126.255.255.255",
                "128.0.0.0 à 191.255.255.255",
                "192.0.0.0 à 223.255.255.255",
                "224.0.0.0 à 239.255.255.255"
            ],
            correct: 2
        },
        {
            question: "Quel protocole est utilisé pour la résolution d'adresses IP en adresses MAC ?",
            answers: [
                "DHCP",
                "DNS",
                "ARP",
                "ICMP"
            ],
            correct: 2
        },
        {
            question: "Combien de bits composent une adresse IPv4 ?",
            answers: [
                "16 bits",
                "32 bits",
                "64 bits",
                "128 bits"
            ],
            correct: 1
        },
        {
            question: "Quel est le port par défaut du protocole SSH ?",
            answers: [
                "Port 21",
                "Port 22",
                "Port 23",
                "Port 25"
            ],
            correct: 1
        },
        {
            question: "Quelle commande permet de voir la table de routage sur un routeur Cisco ?",
            answers: [
                "show ip route",
                "show routing-table",
                "display route",
                "show routes"
            ],
            correct: 0
        },
        {
            question: "Quel masque de sous-réseau correspond à /24 en notation CIDR ?",
            answers: [
                "255.0.0.0",
                "255.255.0.0",
                "255.255.255.0",
                "255.255.255.255"
            ],
            correct: 2
        },
        {
            question: "À quelle couche du modèle OSI fonctionne un switch ?",
            answers: [
                "Couche 1 - Physique",
                "Couche 2 - Liaison de données",
                "Couche 3 - Réseau",
                "Couche 4 - Transport"
            ],
            correct: 1
        },
        {
            question: "Quel protocole permet la configuration automatique d'adresses IP ?",
            answers: [
                "DNS",
                "DHCP",
                "FTP",
                "SMTP"
            ],
            correct: 1
        },
        {
            question: "Combien d'hôtes utilisables offre un réseau /26 ?",
            answers: [
                "30 hôtes",
                "62 hôtes",
                "126 hôtes",
                "254 hôtes"
            ],
            correct: 1
        },
        {
            question: "Quel est le protocole de la couche transport orienté connexion ?",
            answers: [
                "UDP",
                "TCP",
                "ICMP",
                "IP"
            ],
            correct: 1
        }
    ],
    ccnp: [
        {
            question: "Quel protocole de routage utilise l'algorithme DUAL ?",
            answers: [
                "OSPF",
                "RIP",
                "EIGRP",
                "BGP"
            ],
            correct: 2
        },
        {
            question: "Dans OSPF, quelle est la distance administrative par défaut ?",
            answers: [
                "90",
                "100",
                "110",
                "120"
            ],
            correct: 2
        },
        {
            question: "Quel type de LSA décrit les réseaux externes dans OSPF ?",
            answers: [
                "Type 1",
                "Type 2",
                "Type 3",
                "Type 5"
            ],
            correct: 3
        },
        {
            question: "Quelle commande active le routage IPv6 sur un routeur Cisco ?",
            answers: [
                "ipv6 enable",
                "ipv6 unicast-routing",
                "enable ipv6 routing",
                "ip routing ipv6"
            ],
            correct: 1
        },
        {
            question: "Dans BGP, quel attribut est utilisé en premier pour la sélection du meilleur chemin ?",
            answers: [
                "AS_PATH",
                "LOCAL_PREF",
                "WEIGHT",
                "MED"
            ],
            correct: 2
        },
        {
            question: "Quelle est la métrique par défaut d'EIGRP ?",
            answers: [
                "Hop count",
                "Bandwidth et Delay",
                "Cost basé sur la bande passante",
                "Distance administrative"
            ],
            correct: 1
        },
        {
            question: "Dans une architecture à trois niveaux, quel est le rôle de la couche Core ?",
            answers: [
                "Accès utilisateur",
                "Distribution et routage",
                "Commutation rapide backbone",
                "Sécurité périmétrique"
            ],
            correct: 2
        },
        {
            question: "Quel protocole est utilisé pour le spanning tree rapide ?",
            answers: [
                "STP (802.1D)",
                "RSTP (802.1w)",
                "MSTP (802.1s)",
                "PVST+"
            ],
            correct: 1
        },
        {
            question: "Quelle commande permet de voir les voisins OSPF ?",
            answers: [
                "show ospf neighbors",
                "show ip ospf neighbor",
                "display ospf peers",
                "show ospf adjacency"
            ],
            correct: 1
        },
        {
            question: "Dans VTP, quel mode permet de créer, modifier et supprimer des VLANs ?",
            answers: [
                "Client",
                "Server",
                "Transparent",
                "Master"
            ],
            correct: 1
        }
    ],
    security: [
        {
            question: "Quel type d'attaque consiste à submerger un serveur de requêtes ?",
            answers: [
                "Phishing",
                "DDoS",
                "Man-in-the-Middle",
                "SQL Injection"
            ],
            correct: 1
        },
        {
            question: "Quel port utilise le protocole HTTPS ?",
            answers: [
                "Port 80",
                "Port 443",
                "Port 8080",
                "Port 8443"
            ],
            correct: 1
        },
        {
            question: "Que signifie CIA dans les principes de la cybersécurité ?",
            answers: [
                "Control, Integrity, Access",
                "Confidentiality, Integrity, Availability",
                "Cyber, Information, Authentication",
                "Certificate, Identity, Authorization"
            ],
            correct: 1
        },
        {
            question: "Quelle technique de chiffrement utilise une seule clé ?",
            answers: [
                "Chiffrement asymétrique",
                "Chiffrement symétrique",
                "Hachage",
                "Signature numérique"
            ],
            correct: 1
        },
        {
            question: "Quel est l'objectif principal d'un IDS ?",
            answers: [
                "Bloquer les attaques",
                "Détecter les intrusions",
                "Chiffrer le trafic",
                "Analyser les malwares"
            ],
            correct: 1
        },
        {
            question: "Quel protocole est utilisé pour créer des VPN sécurisés ?",
            answers: [
                "HTTP",
                "FTP",
                "IPSec",
                "SMTP"
            ],
            correct: 2
        },
        {
            question: "Qu'est-ce qu'un Zero-Day ?",
            answers: [
                "Un virus détecté immédiatement",
                "Une vulnérabilité non encore corrigée",
                "Un système sans faille de sécurité",
                "Un antivirus mis à jour quotidiennement"
            ],
            correct: 1
        },
        {
            question: "Quel type de scan Nmap est le plus discret ?",
            answers: [
                "TCP Connect scan",
                "SYN scan",
                "FIN scan",
                "UDP scan"
            ],
            correct: 2
        },
        {
            question: "Quelle est la longueur d'une clé AES-256 ?",
            answers: [
                "128 bits",
                "192 bits",
                "256 bits",
                "512 bits"
            ],
            correct: 2
        },
        {
            question: "Que permet de vérifier un certificat SSL/TLS ?",
            answers: [
                "La vitesse de connexion",
                "L'identité du serveur",
                "La taille des données",
                "Le système d'exploitation"
            ],
            correct: 1
        }
    ],
    linux: [
        {
            question: "Quelle commande permet de changer les permissions d'un fichier ?",
            answers: [
                "chown",
                "chmod",
                "chgrp",
                "chattr"
            ],
            correct: 1
        },
        {
            question: "Quel fichier contient les informations des utilisateurs sous Linux ?",
            answers: [
                "/etc/passwd",
                "/etc/users",
                "/etc/shadow",
                "/etc/group"
            ],
            correct: 0
        },
        {
            question: "Quelle commande affiche les processus en cours d'exécution ?",
            answers: [
                "ls",
                "ps",
                "df",
                "du"
            ],
            correct: 1
        },
        {
            question: "Quel est le répertoire racine sous Linux ?",
            answers: [
                "C:\\",
                "/root",
                "/",
                "/home"
            ],
            correct: 2
        },
        {
            question: "Quelle commande permet de rechercher un fichier ?",
            answers: [
                "search",
                "locate",
                "find",
                "grep"
            ],
            correct: 2
        },
        {
            question: "Quelle commande permet d'afficher l'espace disque disponible ?",
            answers: [
                "df -h",
                "du -h",
                "free -h",
                "disk -h"
            ],
            correct: 0
        },
        {
            question: "Quel fichier contient la configuration réseau sous Debian ?",
            answers: [
                "/etc/network/interfaces",
                "/etc/networks",
                "/etc/netconfig",
                "/etc/resolv.conf"
            ],
            correct: 0
        },
        {
            question: "Quelle commande permet de devenir super-utilisateur ?",
            answers: [
                "su",
                "sudo",
                "admin",
                "root"
            ],
            correct: 0
        },
        {
            question: "Que signifie la permission 755 ?",
            answers: [
                "rwxr-xr-x",
                "rwxrwxrwx",
                "rw-r--r--",
                "r-xr-xr-x"
            ],
            correct: 0
        },
        {
            question: "Quelle commande permet de voir les connexions réseau actives ?",
            answers: [
                "netstat",
                "ifconfig",
                "ping",
                "traceroute"
            ],
            correct: 0
        }
    ]
};

// Messages de félicitations selon le score
const scoreMessages = {
    excellent: [
        "🎉 Excellent ! Vous maîtrisez parfaitement le sujet !",
        "👏 Bravo ! Performance exceptionnelle !",
        "⭐ Parfait ! Vous êtes prêt pour la certification !"
    ],
    good: [
        "✅ Très bien ! Vous avez de solides connaissances !",
        "👍 Bon travail ! Continuez comme ça !",
        "💪 Bien joué ! Quelques révisions et ce sera parfait !"
    ],
    average: [
        "📚 Pas mal, mais il y a encore du travail !",
        "💡 Continuez à vous entraîner pour progresser !",
        "🎯 Bon début ! Révisez les points faibles !"
    ],
    poor: [
        "📖 Il faut réviser davantage avant l'examen !",
        "🔄 Recommencez et prenez le temps de bien lire !",
        "💻 Revoir les fondamentaux est nécessaire !"
    ]
};

// Exporter les données
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { quizData, scoreMessages };
}
