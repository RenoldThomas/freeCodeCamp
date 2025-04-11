# Renold Thomas
# Program to encrypt and decrypt a message using the Vigenere cipher

def vigenere(message, key, direction=1):
    key_index = 0
    alphabet = 'abcdefghijklmnopqrstuvwxyz'
    final_message = ''

    for char in message.lower():

        # Append any non-letter character to the message
        if not char.isalpha():
            final_message += char
        else:        
            # Find the right key character to encode/decode
            key_char = key[key_index % len(key)]
            key_index += 1

            # Define the offset and the encrypted/decrypted letter
            offset = alphabet.index(key_char)
            index = alphabet.find(char)
            new_index = (index + offset*direction) % len(alphabet)
            final_message += alphabet[new_index]
    
    return final_message

def encrypt(message, key):
    return vigenere(message, key)
    
def decrypt(message, key):
    return vigenere(message, key, -1)

while True:
    # Ask the user if they want to encrypt or decrypt
    choice = input('Do you want to encrypt or decrypt? (e/d) ')

    if choice.lower() == 'e':
        text = input('Enter the text to encrypt: ')
        key = input('Enter the key: ')
        print('Encrypted text:', encrypt(text, key))
    elif choice.lower() == 'd':
        text = input('Enter the text to decrypt: ')
        key = input('Enter the key: ')
        print('Decrypted text:', decrypt(text, key))
    else:
        print('Invalid choice')
    
    # Ask the user if they want to continue
    cont = input('\nDo you want to continue? (y/n) ')
    if cont.lower() != 'y':
        break