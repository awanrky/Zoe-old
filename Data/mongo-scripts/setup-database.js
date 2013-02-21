var currentDirectory = pwd();
print("current directory: " + currentDirectory);

print("Creating database...");
load(currentDirectory + "/initialize-database.js");

print("Creating Data collection...");
load(currentDirectory + "/collections/data.js");

print("Creating Log collection...");
load(currentDirectory + "/collections/log.js");

print("Creating Meta collection...");
load(currentDirectory + "/collections/meta.js");

print("Creating Person collection...");
load(currentDirectory + "/collections/person.js");

print("Creating Mark...");
load(currentDirectory + "/people/mark.js");