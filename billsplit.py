# rawArr = [
#     'john, jane, jack',
#     'total of 34',
#     'john pays 10',
#     'jane pays 6',
#     'jack and jane split 10'
# ]

# cleanedArr = [
#     ['john', 'jane', 'jack'],
#     34,
#     [10, 'john'],
#     [6, 'jane'],
#     [10, 'jack', 'jane'],
# ]

SCHEMA = '''Please enter the input in the following example: names; total with number at end; person pays amount; person pays amount. For example, john, jane, jack; total of 34; john pays 10; jane pays 6; jack and jane split 10;
'''

def splitBill(input):
    array = input.split('; ')
    cleanedArray = cleanArray(array)
    return splitBillOnCleanedArray(cleanedArray)

# Clean the raw array of text input
def cleanArray(array):
    peopleList = array[0].split(', ')
    total = float(array[1].split()[-1])
    entries = []

    # Loops through all entries
    for entry in array[2:]:
        tempEntry = []
        line = entry.split()
        # Loops through each element and checks if it's a person or a number
        for elem in line:
            # If it's a person, add the person
            if elem in peopleList:
                tempEntry.append(elem)
            else:
                # Try to convert it to a float, and if it works, then add it as the cost
                try:
                    cost = float(elem)
                    tempEntry.insert(0, cost)
                except ValueError:
                    pass
        # Add the current cleaned entry to the entries list
        entries.append(tempEntry)
    
    # Add the metadata of people and total cost to the beginning of the entries list
    entries.insert(0, peopleList)
    entries.insert(1, total)

    return entries

# Calculate how much each person should be paying
def splitBillOnCleanedArray(array):
    people = array[0]
    total = array[1]

    charges = dict.fromkeys(people, 0)

    subtotal = 0
    for entry in array[2:]:
        # print(array)
        cost = entry[0]
        subtotal = subtotal + cost
        numPeopleInEntry = len(entry[1:])

        perPersonCost = cost/numPeopleInEntry

        for person in entry[1:]:
            if person not in people:
                # TODO: update with exact transaction info
                return 'error: could not find person for entry: ' + str(entry)
            charges[person] = charges[person] + perPersonCost
    
    # Check edge case of if there are no individual charges. This should split everything equally.
    if subtotal == 0:
        numPeople = len(people)
        for person in charges:
            charges[person] = '${:,.2f}'.format(total / numPeople)
    # Calculate normally otherwise
    else:
        for person in charges:
            charges[person] = '${:,.2f}'.format((charges[person] / subtotal) * total)

    return charges

# testInput = 'john, jane, jack. total of 34. john pays 10. jane pays 6. jack and jane split 10.'

input = input(SCHEMA)
output = splitBill(input)
for key, value in output.items():
    print(key, value)