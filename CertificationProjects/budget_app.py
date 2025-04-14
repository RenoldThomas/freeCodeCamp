class Category:
    def __init__(self, category):
        self.category = category
        self.ledger = []
        
    def __str__(self):
        title = f'{self.category:*^30}\n'
        items = ''
        for item in self.ledger:
            items += f"{item['description'][:23]:<23}{item['amount']:>7.2f}\n"
        total = self.get_balance()
        return title + items + f'Total: {total:.2f}'
    
    def deposit(self, amount, description = ''):
        self.ledger.append({'amount': amount, 'description': description})
    
    def withdraw(self, amount, description = ''):
        if self.check_funds(amount):
            self.ledger.append({'amount': -amount, 'description': description})
            return True
        return False
    
    def get_balance(self):
        total = 0
        for item in self.ledger:
            total += item['amount']
        return total
    
    def transfer(self, amount, category):
        if not self.check_funds(amount):
            return False
        else: 
            self.withdraw(amount, f'Transfer to {category.category}')
            category.deposit(amount, f'Transfer from {self.category}')
            return True
        
    def check_funds(self, amount):
        total = 0
        for item in self.ledger:
            total += item['amount']
        return total >= amount

def create_spend_chart(categories):
    result = 'Percentage spent by category\n'
    n = len(categories)
    total_spent = 0
    spent = []
    for category in categories:
        spent_amount = 0
        for item in category.ledger:
            if item['amount'] < 0:
                spent_amount += abs(item['amount'])
        spent.append(spent_amount)
        total_spent += spent_amount
    for i in range(100, -1, -10):
        result += f"{i:>3}| "
        for amount in spent:
            if amount / total_spent * 100 >= i:
                result += 'o  '
            else:
                result += '   '
        result += '\n'
    result += '    ' + '---'*n +'-\n'
    max_length = max(len(category.category) for category in categories)
    for i in range(max_length):
        result += '     '
        for category in categories:
            if i < len(category.category):
                result += category.category[i] + '  '
            else:
                result += '   '
        result += '\n'
    result = result[:-1]  # Remove the last newline character
    return result    

def main():
    food = Category('Food')
    food.deposit(1000, 'deposit')
    food.withdraw(10.15, 'groceries')
    food.withdraw(15.89, 'restaurant and more food for dessert')
    clothing = Category('Clothing')
    food.transfer(50, clothing)
    print(food)
    print(create_spend_chart([food, clothing]))
    
if __name__ == "__main__":
    main()