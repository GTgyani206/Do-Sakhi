from flask import Flask, request, jsonify, send_file
import google.generativeai as genai
import openai
from pathlib import Path
import os
import tempfile

app = Flask(__name__)

# Hardcoded API keys as fallback (not recommended for production)
# DEFAULT_GEMINI_API_KEY = "AIzaSyDOXp84hRmFFVgVY4Oae9rUpBcw-L9vICk"
# DEFAULT_OPENAI_API_KEY = "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"

# Get API keys from environment variables or use defaults
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")

# Configure the APIs
genai.configure(api_key="AIzaSyCNVE7HDEptqoOngXiXOONUC2_uFksJl_8")
openai_client = openai.OpenAI(api_key="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")

@app.route('/generate-podcast', methods=['POST'])
def generate_podcast():
    try:
        # Get parameters from request
        data = request.json
        source_url = data.get('source_url', '')
        language = data.get('language', 'Hindi')
        voice = data.get('voice', 'coral')
        temperature = float(data.get('temperature', 0.7))
        
        # Allow API key override in request (for testing)
        custom_gemini_key = data.get('gemini_api_key', None)
        if custom_gemini_key:
            genai.configure(api_key=custom_gemini_key)
        
        # Create the prompt
        prompt = f"""
        Imagine you are a compassionate educator and storyteller who seamlessly blends modern health science with India's rich tapestry of folklore.
        Create a detailed, single-person narrative script in {language} that explains the menstrual cycle in a simple, accessible way.
        Your explanation should demystify the biological processes involved while incorporating local Indian folklore, traditional myths,
        cultural symbols, and allegories. Use relatable analogies from age-old Indian stories and rituals to make the complex concepts
        clear and engaging for someone with little to no background in health science at the following URL:
        {source_url}

        Make sure the script flows naturally for an audio presentation.
        """
        
        # Generate the script with Gemini
        model = genai.GenerativeModel('gemini-2.0-flash')
        response = model.generate_content(
            [{"role": "user", "parts": [prompt]}],
            generation_config=genai.types.GenerationConfig(temperature=temperature)
        )
        
        podcast_script = response.text
        
        # Generate audio with OpenAI
        temp_dir = tempfile.mkdtemp()
        speech_file_path = Path(temp_dir) / "speech.mp3"
        
        # Allow API key override for OpenAI too
        custom_openai_key = data.get('openai_api_key', None)
        client = openai_client
        if custom_openai_key:
            client = openai.OpenAI(api_key=custom_openai_key)
        
        tts_response = client.audio.speech.create(
            model="gpt-4o-mini-tts",
            voice=voice,
            input=podcast_script,
        )
        
        tts_response.stream_to_file(speech_file_path)
        
        # Return both the script and audio file
        return jsonify({
            "status": "success",
            "script": podcast_script,
            "audio_url": f"/download-audio/{speech_file_path.name}"
        })
        
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/download-audio/<filename>', methods=['GET'])
def download_audio(filename):
    temp_dir = tempfile.gettempdir()
    return send_file(Path(temp_dir) / filename, mimetype="audio/mpeg", as_attachment=True)

@app.route('/voices', methods=['GET'])
def get_voices():
    # List of available voices in OpenAI
    voices = ["alloy", "echo", "fable", "onyx", "nova", "shimmer", "coral"]
    return jsonify({"voices": voices})

# Add a simple test endpoint
@app.route('/test', methods=['GET'])
def test_endpoint():
    return jsonify({
        "status": "success", 
        "message": "API is working",
        "gemini_key_set": GEMINI_API_KEY != "",
        "openai_key_set": OPENAI_API_KEY != ""
    })

if __name__ == '__main__':
    # Set environment variables for production
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=True)  # Set debug=True for development
