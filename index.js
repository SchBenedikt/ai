import indexHtml from './index.html'; // Pfade anpassen je nach Struktur deines Projekts

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/') {
      return new Response(indexHtml, {
        headers: {
          'content-type': 'text/html',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        },
      });
    } else if (url.pathname === '/generate') {
      const type = url.searchParams.get('type');
      const prompt = url.searchParams.get('prompt');
      const aiModel = url.searchParams.get('aiModel'); // Neuer Parameter für das AI-Modell

      if (!prompt) {
        return new Response('Prompt is required', {
          status: 400,
          headers: {
            'content-type': 'text/plain',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
          }
        });
      }

      if (type === 'text') {
        // Handle text generation based on the selected AI model
        let simple = { prompt: prompt };
        let response;

        if (aiModel === '@hf/google/gemma-7b-it') {
          response = await env.AI.run('@hf/google/gemma-7b-it', simple);
        } else if (aiModel === '@cf/meta/llama-3-8b-instruct') {
          response = await env.AI.run('@cf/meta/llama-3-8b-instruct', simple);
        } else if (aiModel === '@cf/thebloke/discolm-german-7b-v1-awq') {
          response = await env.AI.run('@cf/thebloke/discolm-german-7b-v1-awq', simple);
        } else if (aiModel === '@cf/tinyllama/tinyllama-1.1b-chat-v1.0') {
          response = await env.AI.run('@cf/tinyllama/tinyllama-1.1b-chat-v1.0', simple);
        } else if (aiModel === '@cf/mistral/mistral-7b-instruct-v0.1') {
          response = await env.AI.run('@cf/mistral/mistral-7b-instruct-v0.1', simple);
        } else if (aiModel === '@hf/nousresearch/hermes-2-pro-mistral-7b') {
          response = await env.AI.run('@hf/nousresearch/hermes-2-pro-mistral-7b', simple);
        } else if (aiModel === '@hf/thebloke/openhermes-2.5-mistral-7b-awq') {
          response = await env.AI.run('@hf/thebloke/openhermes-2.5-mistral-7b-awq', simple);
        } else if (aiModel === 'qwen1.5-14b-chat-awq') {
          response = await env.AI.run('qwen1.5-14b-chat-awq', simple);
        } else if (aiModel === '@cf/microsoft/phi-2') {
          response = await env.AI.run('@cf/microsoft/phi-2', simple);
        } else if (aiModel === '@hf/thebloke/neural-chat-7b-v3-1-awq') {
          response = await env.AI.run('@hf/thebloke/neural-chat-7b-v3-1-awq', simple);
        } else if (aiModel === '@cf/deepseek-ai/deepseek-math-7b-instruct') {
          response = await env.AI.run('@cf/deepseek-ai/deepseek-math-7b-instruct', simple);
        } else if (aiModel === '@cf/deepseek-ai/deepseek-math-7b-base') {
          response = await env.AI.run('@cf/deepseek-ai/deepseek-math-7b-base', simple);
        } else if (aiModel === '@hf/thebloke/deepseek-coder-6.7b-base-awq') {
          response = await env.AI.run('@hf/thebloke/deepseek-coder-6.7b-base-awq', simple);
        } else if (aiModel === '@cf/stabilityai/stable-diffusion-xl-base-1.0') {
          response = await env.AI.run('@cf/stabilityai/stable-diffusion-xl-base-1.0', simple);
        } else if (aiModel === '@cf/bytedance/stable-diffusion-xl-lightning') {
          response = await env.AI.run('@cf/bytedance/stable-diffusion-xl-lightning', simple);
        } else if (aiModel === '@cf/lykon/dreamshaper-8-lcm') {
          response = await env.AI.run('@cf/lykon/dreamshaper-8-lcm', simple);
        } else {
          return new Response('Invalid AI model', {
            status: 400,
            headers: { 'content-type': 'text/plain' }
          });
        }

        let tasks = [{ inputs: simple, response }];

        return new Response(JSON.stringify(tasks), {
          headers: {
            'content-type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
          }
        });
      } else if (type === 'image') {
        // Handle image generation based on the selected AI model
        const inputs = { prompt: prompt };
        let response;

        if (aiModel === '@cf/stabilityai/stable-diffusion-xl-base-1.0') {
          response = await env.AI.run('@cf/stabilityai/stable-diffusion-xl-base-1.0', inputs);
        } else if (aiModel === '@cf/bytedance/stable-diffusion-xl-lightning') {
          response = await env.AI.run('@cf/bytedance/stable-diffusion-xl-lightning', inputs);
        } else if (aiModel === '@cf/lykon/dreamshaper-8-lcm') {
          response = await env.AI.run('@cf/lykon/dreamshaper-8-lcm', inputs);
        } else {
          return new Response('Invalid AI model', {
            status: 400,
            headers: { 'content-type': 'text/plain' }
          });
        }

        return new Response(response, {
          headers: { 'content-type': 'image/png' },
        });
      } else {
        return new Response('Invalid type. Use "type=text" or "type=image" in query parameters.', {
          status: 400,
          headers: { 'content-type': 'text/plain' }
        });
      }
    } else {
      return new Response('Not found', { status: 404 });
    }
  }
};
