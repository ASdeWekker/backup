#!/bin/python3

import argparse

parser = argparse.ArgumentParser(description="Control the LED strip")
parser.add_argument("-c", "--color", type=int, metavar="", help="Give a color")
parser.add_argument("-r", "--red", type=int, metavar="", help="The red color value")
parser.add_argument("-g", "--green", type=int, metavar="", help="The green color value")
parser.add_argument("-b", "--blue", type=int, metavar="", help="The blue color value")
group = parser.add_mutually_exclusive_group()
group.add_argument("-O", "--on", action="store_true", help="Turn on")
group.add_argument("-o", "--off", action="store_true", help="Turn off")

args = parser.parse_args()

if __name__ == "__main__":
	print(args.color)
	print(args.red)
	print(args.green)
	print(args.blue)
	if args.on:
		print("Turning on")
	elif args.off:
		print("Turning off")
	else:
		print("Not really gonna do anything")
