export const parseJSON = (input) => {
  try {
    return {
      success: true,
      data: JSON.parse(input),
      error: null
    };
  } catch (e) {
    return {
      success: false,
      data: null,
      error: `Invalid JSON: ${e.message}`
    };
  }
};

export const validateJSON = (input) => {
  if (!input || !input.trim()) {
    return { valid: false, error: 'JSON input is empty' };
  }
  
  try {
    JSON.parse(input);
    return { valid: true, error: null };
  } catch (e) {
    return { valid: false, error: e.message };
  }
};