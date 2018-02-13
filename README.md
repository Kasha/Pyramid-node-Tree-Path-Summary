# Pyramid-node-Tree-Path-Summary
Pyramid node Tree Path Summary
Input:
File with numbers, arranged in a “Pyramid” structure, e.g.:
               
	       55
								
          94       48
					
     95      30        28
     
		 
77      71       26         28



Definition:
Path – list of numbers, one from each row. The path must start in the first row ( pyramid head) and go down row by row until the last row, while it cant move more than one to the right or left, for example a path that includes  48 and 95 is not valid.
Example for valid path – 55, 48, 30, 71

The output should be  sum of each path with num of occurences.
For this input, the sum of yellow path is 55 + 48 + 30 + 71 = 204
This sum exist one time for this input, so we count 1 occurrence for 204.
159 exist two times, 55+48+30+26 = 159 and 55+48+28+28 = 159
Therefore it has count of 2
The output should look like:
Sum | Count
159 | 2
204 | 1
The output should be sorted by count

