# Renold Thomas
# Probability Calculator
# This program simulates drawing balls from a hat and calculates the probability of drawing a specific combination of colored balls.

import copy
import random

class Hat:
    def __init__(self, **kwargs):
        self.contents = []
        for color, num in kwargs.items():
            self.contents.extend([color] * num)

    def draw(self, number_to_draw):
        if number_to_draw > len(self.contents):
            removed_balls = self.contents[:]
            self.contents = []
            return removed_balls
        
        removed_balls = []
        for _ in range(number_to_draw):
            random_index = random.randint(0, len(self.contents) - 1)
            removed_balls.append(self.contents.pop(random_index))
        
        return removed_balls


def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
    if not isinstance(hat, Hat):
        raise TypeError("Hat must be of type Hat.")

    successful_experiments = 0

    for _ in range(num_experiments):
        hat_copy = copy.deepcopy(hat) 
        
        drawn_balls = hat_copy.draw(num_balls_drawn)

        drawn_counts = {}
        for color in drawn_balls:
            drawn_counts[color] = drawn_counts.get(color, 0) + 1

        match = True
        for color, required_count in expected_balls.items():
            if drawn_counts.get(color, 0) < required_count:
                match = False
                break

        if match:
            successful_experiments += 1
            
    return successful_experiments / num_experiments

def main():
    hat = Hat(black=6, red=4, green=3)
    probability = experiment(hat=hat,
                  expected_balls={'red':2,'green':1},
                  num_balls_drawn=5,
                  num_experiments=2000)
    print(f"Probability: {probability:.4f}")

if __name__ == "__main__":
    main()