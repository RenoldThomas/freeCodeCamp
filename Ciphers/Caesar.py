# Renold Thomas
# Program to encrypt a message using the Caesar cipher

def caesar(message, offset):
    alphabet = 'abcdefghijklmnopqrstuvwxyz'
    encrypted_text = ''

    for char in message.lower():
        if char == ' ':
            encrypted_text += char
        else:
            index = alphabet.find(char)
            new_index = (index + offset) % len(alphabet)
            encrypted_text += alphabet[new_index]
    print('plain text:', message)
    print('encrypted text:', encrypted_text)
    
while True:
    text = input('Enter the text to encrypt: ')
    shift = int(input('Enter the shift value: '))
    caesar(text, shift)
    
    # Ask the user if they want to continue
    cont = input('\nDo you want to continue? (y/n) ')
    if cont.lower() != 'y':
        break