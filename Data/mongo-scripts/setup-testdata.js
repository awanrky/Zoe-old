var currentDirectory = pwd();
print("current directory: " + currentDirectory);

print("Creating Lacy...");
load(currentDirectory + "/people/lacy.js");

print("Creating test data...");
print("BodyWeight...");
load(currentDirectory + "/test-data/body-weight.js");