$database = $args[0]

echo "Creating database..."
mongo $database InitializeDatabase.js
echo  ""

echo "Creating Data collection..."
mongo $database Collections/Data.js
echo ""

echo "Creating Log collection..."
mongo $database Collections/Log.js
echo ""

echo "Creating Meta collection..."
mongo $database Collections/Meta.js
echo ""

echo "Creating Person collection..."
mongo $database Collections/Person.js
echo ""

echo "Creating Mark..."
mongo $database People/Mark.js
echo  ""


if ($database -match "Development" -or $database -match "Test")
{
	
	echo "Creating Lacy..."
	mongo $database People/Lacy.js
	echo ""

	echo "Creating test data..."
		echo "BodyWeight..."
		mongo $database TestData/BodyWeight.js
	echo ""


}
