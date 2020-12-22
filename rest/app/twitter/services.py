import os

module_dir = os.path.dirname(__file__)  # get current directory
file_path = os.path.join(module_dir, 'stopwords.txt')
def get_stopwords():
  words = open(file_path,'r')
  stopwords = [word.strip() for word in words]
  return set(stopwords) 

def word_count(str):
  d = dict()   
  arr = []
  print(str)
  words = str.split(" ") 
  for word in words: 
      # Check if the word is already in dictionary 
      if word in d: 
          # Increment count of word by 1 
          d[word] = d[word] + 1
      else: 
          # Add the word to dictionary with count 1 
          d[word] = 1  
  for key in list(d.keys()): 
    arr.append([key,d[key]])
  return arr

        