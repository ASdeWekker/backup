## Exercise

def who_do_you_know():
	# ask the user for a list of people they know
	people = input("Name some people you know ")
	# split the string into a list
	people_list = people.split(" ")
	# return that list
	return people_list

def ask_user():
	# ask user for a name
	# see if theur name is in the list of people they know
	# print out that they know the person
	names = who_do_you_know()
	input_name = input("Give me a name ")
	for name in names:
		if name == input_name:
			print("You know this person")

ask_user()
