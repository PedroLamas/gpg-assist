var app = angular.module('MainApp', []);

app.controller('MainController', function($scope) {
  $scope.availableCommands = [
    { description: "generate a new key", command: "--generate-key", expertCommand: "--expert --full-generate-key" },
    { description: "list all keys", command: "--list-keys", opKey: true },
    { description: "list all keys with their fingerprints", command: "--fingerprint", opKey: true },
    { description: "export a public key", command: "--export", opArmor: true, opMinimal: true, opOutput: true, opKey: true },
    { description: "export a private key", command: "--export-secret-key", opArmor: true, opOutput: true, opKey: true },
    { description: "import a key", command: "--import", opInput: true },
    { description: "delete a public key", command: "--delete-keys", opKey: true },
    { description: "delete a private key", command: "--delete-secret-keys", opKey: true },
    { description: "sign a key", command: "--sign-key", expertCommand: "--ask-cert-level --sign-key", opKey: true },
    { description: "sign a message", command: "--sign", opArmor: true, opOutput: true, opInput: true },
    { description: "encrypt a message", command: "--encrypt", opArmor: true, opOutput: true, opRecipient: true, opInput: true },
    { description: "decrypt a message", command: "--decrypt", opOutput: true, opInput: true },
    { description: "verify a message", command: "--verify", opInput: true }
  ];

  $scope.buildCommandLine = function() {
    var selectedCommand = $scope.selectedCommand;

    if (!selectedCommand) {
      return null;
    }

    var commandLine = ["gpg"];

    if (selectedCommand.opArmor && $scope.hasArmor) {
      commandLine.push("--armor");
    }

    if (selectedCommand.opMinimal && $scope.isMinimal) {
      commandLine.push("--export-options export-minimal");
    }
    
    if (selectedCommand.opOutput && $scope.output == "1" && $scope.outputFile) {
      commandLine.push("--output");
      commandLine.push($scope.outputFile);
    }

    if (selectedCommand.opRecipient && $scope.recipient) {
      commandLine.push("--recipient");
      commandLine.push($scope.recipient);
    }
    
    if (selectedCommand.expertCommand && $scope.isExpert) {
      commandLine.push(selectedCommand.expertCommand);
    }
    else {
      commandLine.push(selectedCommand.command);
    }

    if (selectedCommand.opKey && $scope.key) {
      commandLine.push($scope.key);
    }

    if (selectedCommand.opInput && $scope.input == "1" && $scope.inputFile) {
      commandLine.push($scope.inputFile);
    }

    return commandLine.join(" ");
  }
});