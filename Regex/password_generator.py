# Renold Thomas
# This script generates a random password based on user-defined criteria.
# It ensures that the password meets the specified requirements for length, numbers, special characters,
# uppercase letters, and lowercase letters.

import re
import secrets
import string

def generate_password(length=16, nums=1, special_chars=1, uppercase=1, lowercase=1):
    # Define the possible characters for the password
    letters = string.ascii_letters
    digits = string.digits
    symbols = string.punctuation

    # Combine all characters
    all_characters = letters + digits + symbols

    while True:
        password = ''
        # Generate password
        for _ in range(length):
            password += secrets.choice(all_characters)
        
        constraints = [
            (nums, r'\d'),
            (special_chars, fr'[{symbols}]'),
            (uppercase, r'[A-Z]'),
            (lowercase, r'[a-z]')
        ]

        # Check constraints        
        if all(
            constraint <= len(re.findall(pattern, password))
            for constraint, pattern in constraints
        ):
            break
    
    return password

def main():
    print('Password Generator')
    print('------------------')
    # Prompt user for inputs, providing defaults if no input is given
    length = input('How long do you want your password to be? (default: 16) ')
    length = int(length) if length.strip() else 16

    nums = input('How many numbers do you want in your password? (default: 1) ')
    nums = int(nums) if nums.strip() else 1

    special_chars = input('How many special characters do you want in your password? (default: 1) ')
    special_chars = int(special_chars) if special_chars.strip() else 1

    uppercase = input('How many uppercase letters do you want in your password? (default: 1) ')
    uppercase = int(uppercase) if uppercase.strip() else 1

    lowercase = input('How many lowercase letters do you want in your password? (default: 1) ')
    lowercase = int(lowercase) if lowercase.strip() else 1

    # Generate the password
    new_password = generate_password(length, nums, special_chars, uppercase, lowercase)
    print('Generated password:', new_password)
    
if __name__ == '__main__':
    main()