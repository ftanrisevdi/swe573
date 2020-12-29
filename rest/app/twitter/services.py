import os
module_dir = os.path.dirname(__file__)  # get current directory
file_path_w = os.path.join(module_dir, 'stopwords.txt')
file_path_c = os.path.join(module_dir, 'stopcharachers.txt')
import emoji
import requests 

def get_stopwords():
  words = open(file_path_w,'r')
  stopwords = [word.strip() for word in words]
  return set(stopwords) 
def get_stopcharacters():
  characters = open(file_path_c,'r')
  stopcharacters = [word.strip() for word in characters]
  return set(stopcharacters) 

def word_count(sentences):
  d = dict()   
  arr = []
  words = []
  for sentence in sentences: 
    words = words + sentence.split(" ")   
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

def clean_text(text): 
  clean_tweets = '';   
  clean_characters = '';
  result = "";
  querywords = text.lower() 
  querywords  = [ word for word in querywords if word not in get_stopcharacters()]
  clean_characters = clean_characters + ''.join(querywords)  
  clean_tweets =  clean_characters.split()
  resultwords  = [ word for word in clean_tweets if word not in get_stopwords()]
  result = result + ' '.join(resultwords)
  return result 

def give_emoji_free_text(text):
  allchars = [str for str in text]
  emoji_list = [c for c in allchars if c in emoji.UNICODE_EMOJI]
  strr = ' '.join([str for str in text.split() if not any(i in str for i in emoji_list)])
  return strr  

def tagme(data):
  URL = "https://tagme.d4science.org/tagme/gui"   
  r = requests.post(url = URL, data = data) 
  pastebin_url = r.text 
  print("The pastebin URL is:%s"%pastebin_url)
  return  pastebin_url