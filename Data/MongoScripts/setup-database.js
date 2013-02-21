
print("current directory: " + pwd());

print("Creating database...");
load("./initialize-database.js");

print("Creating Data collection...");
load("./Collections/data.js");

print("Creating Log collection...");
load("./Collections/log.js");

print("Creating Meta collection...");
load("./Collections/meta.js");

print("Creating Person collection...");
load("./Collections/person.js");

print("Creating Mark...");
load("./People/mark.js");