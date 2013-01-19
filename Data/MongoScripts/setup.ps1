$database = $args[0]
$environment = $args[1]

mongo $database --quiet InitializeDatabase.js

mongo $database --quiet People/Mark.js


if ($database -ne "production")
{
	mongo $database --quiet People/Lacy.js




}