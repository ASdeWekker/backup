'''
multi line comment

# Ask the user to input their name
name = input('What is your name? ')

# Print ouy hello followed by the name they entered
print('Hello ', name)


# Ask the user to input 2 values and store them in variables num1 num2
num1, num2 = input("Enter 2 numbers: ").split()

# Convert the strings into regular numbers
num1 = int(num1)
num2 = int(num2)

# Add the values entered and store in sum
sum = num1 + num2

# Subtract values and store in difference
difference = num1 - num2

# Multiply the values and store in product
product = num1 * num2

# Divide the values and store in quotient
quotient = num1 / num2

# Use modulus on the values to find the remainder
remainder = num1 % num2

# Print the results
print("{} + {} = {}".format(num1, num2, sum))
print("{} - {} = {}".format(num1, num2, difference))
print("{} * {} = {}".format(num1, num2, product))
print("{} / {} = {}".format(num1, num2, quotient))
print("{} % {} = {}".format(num1, num2, remainder))


# Problem: Receive miles and convert to kilometers
# kilometers = miles * 1.60934
# Enter Miles 5
# 5 miles equals 8.04 kilometers

# Have user enter the miles and store in miles
miles = input("Enter the miles: ")

# Convert string to integer
miles = int(miles)

# Convert miles to 1.60934
kilometers = miles * 1.60934

# Print miles and kilometers
print("{} Miles = {} Kilometers".format(miles, kilometers))


# Enter calculation 5 * 6
# 5 * 6 = 30

# Store the user input of 2 numbers and the operator
num1, oper, num2 = input("Enter your calculation: ").split()

# Convert the strings into integers
num1 = int(num1)
num2 = int(num2)

# if + then we need to provide output based on addition
# Print the result
if oper == "+":
    print("{} + {} = {}".format(num1, num2, num1 + num2))
elif oper == "-":
    print("{} - {} = {}".format(num1, num2, num1 - num2))
elif oper == "*":
    print("{} * {} = {}".format(num1, num2, num1 * num2))
elif oper == "/":
    print("{} / {} = {}".format(num1, num2, num1 / num2))
else
    print("Input a valid calculation!!")
'''

















































