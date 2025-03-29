def arithmetic_arranger(problems, show_answers=False):
    if len(problems) > 5:
        return('Error: Too many problems.')
    
    first_line = ''
    second_line = ''
    third_line = ''
    fourth_line = ''

    for problem in problems:
        parts = problem.split()
        num1, operator, num2 = parts

        if operator not in ['+', '-']:
            return("Error: Operator must be '+' or '-'.")
        
        if not num1.isdigit() or not num2.isdigit():
            return('Error: Numbers must only contain digits.')
        
        if len(num1) > 4 or len(num2) > 4:
            return('Error: Numbers cannot be more than four digits.')

        width = max(len(num1), len(num2)) + 2

        first_line += f"{num1:>{width}}    "
        second_line += f"{operator} {num2:>{width-2}}    "
        third_line += '-' * width + "    "

        if show_answers:
            if operator == '+':
                answer = int(num1) + int(num2)
            else:
                answer = int(num1) - int(num2)
            fourth_line += f"{answer:>{width}}    "

    first_line = first_line.rstrip()
    second_line = second_line.rstrip()
    third_line = third_line.rstrip()
    fourth_line = fourth_line.rstrip()

    if show_answers:
        return f"{first_line}\n{second_line}\n{third_line}\n{fourth_line}"
    else:
        return f"{first_line}\n{second_line}\n{third_line}"
    
def main():
    print(f'\n{arithmetic_arranger(["32 + 698", "3801 - 2", "45 + 43", "123 + 49"])}')
    
if __name__ == "__main__":
    main()