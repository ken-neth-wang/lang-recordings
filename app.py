import os
from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()

import openai
openai.api_key = os.getenv("OPENAI_API_KEY")

# input_counter = 0

from flask import Flask, request, render_template, jsonify

app = Flask(__name__, template_folder="templates")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/process-text", methods=["POST"])
def process_input():
    
    try:
        data = request.get_json()
        input_text = data["inputText"]
        print(input_text)
        # Process the input_text (replace this with your actual processing logic)
        # gpt_response = openai.ChatCompletion.create(
        #     model="gpt-3.5-turbo",
        #     messages=[
        #         {"role": "system", "content": "Output only 1 number, with the number being bigger than what the user inputs by 1."},
        #         {"role": "user", "content": input_text}
        #     ]
        #     )
        # content = gpt_response.get("choices")[0].get("message").get("content")
        # processed_text = content
        # print(processed_text)
        # audio_file= open("test_examples/ten_second_audio.mp3", "rb")
        # audio_file = open("test_examples/chinese_poem.wav", "rb")
       
        response = "hi"
        print(response)
        # input_counter += 1
        return response

    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
@app.route("/process-audio", methods=["POST"])
def process_audio():
    try:
        uploaded_file = request.files["audioFile"]

        print(uploaded_file)
        # Process the audio file here (e.g., save, analyze, or modify it)
        # Replace this with your audio processing logic.
        filename = uploaded_file.filename
        save_path = f"user_uploaded_audio/{filename}"
        uploaded_file.save(save_path)
        # not sure why but need to open these as separate files, i assume becasue aft eryou read the first one, the first one is empty
        audio_file = open(save_path, "rb")
        audio_file_translate = open(save_path, "rb")
        # original_transcription_response = openai.Audio.transcribe("whisper-1", audio_file)
        # translated_transcription_response = openai.Audio.translate("whisper-1", audio_file_translate)
        # original_transcript = original_transcription_response.get("text")
        # translated_transcript = translated_transcription_response.get("text")

        # testing

        original_transcript = "You are the listener. We are the radio."
        translated_transcript = "Du bist der Hörer. Wir sind das Radio."

        response = jsonify({"output_original_transcript": original_transcript,
                            "output_translated_transcript": translated_transcript})
        print(original_transcript)
        print(translated_transcript)
        # Send a response back to the client
        return response

    except Exception as e:
        print("Error", e)
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":

    app.run(debug=True)
