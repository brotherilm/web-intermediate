// data/api.js
import { getAccessToken } from "../utils/auth";
import CONFIG from "../config";

const ENDPOINTS = {
  // Auth
  REGISTER: `${CONFIG.BASE_URL}/register`,
  LOGIN: `${CONFIG.BASE_URL}/login`,

  // Stories
  STORIES: `${CONFIG.BASE_URL}/stories`,
  STORY_DETAIL: (id) => `${CONFIG.BASE_URL}/stories/${id}`,
};

export async function register({ name, email, password }) {
  try {
    const response = await fetch(ENDPOINTS.REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const responseJson = await response.json();

    if (!response.ok) {
      return { error: true, data: responseJson };
    }

    return { error: false, data: responseJson };
  } catch (error) {
    return { error: true, data: { message: "Network error" } };
  }
}

export async function login({ email, password }) {
  try {
    const response = await fetch(ENDPOINTS.LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const responseJson = await response.json();

    if (!response.ok) {
      return { error: true, data: responseJson };
    }

    return { error: false, data: responseJson };
  } catch (error) {
    return { error: true, data: { message: "Network error" } };
  }
}

export async function getStories({ page = 1, size = 10, location = 0 } = {}) {
  try {
    const accessToken = getAccessToken();
    const params = new URLSearchParams({
      page,
      size,
      location,
    });

    const response = await fetch(`${ENDPOINTS.STORIES}?${params}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const responseJson = await response.json();

    if (!response.ok) {
      return { error: true, data: responseJson };
    }

    return { error: false, data: responseJson };
  } catch (error) {
    return { error: true, data: { message: "Network error" } };
  }
}

export async function getStoryDetail(id) {
  try {
    const token = getAccessToken();
    if (!token) {
      return {
        error: true,
        data: { message: "No authentication token found" },
      };
    }

    const response = await fetch(ENDPOINTS.STORY_DETAIL(id), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const responseJson = await response.json();

    if (!response.ok) {
      return { error: true, data: responseJson };
    }

    return { error: false, data: responseJson };
  } catch (error) {
    return { error: true, data: { message: "Network error" } };
  }
}

export async function addStory({ description, photo, lat, lon }) {
  try {
    const accessToken = getAccessToken();
    const formData = new FormData();

    formData.append("description", description);
    formData.append("photo", photo);

    // Only append lat and lon if they are provided and not null/undefined
    if (lat !== undefined && lat !== null) {
      formData.append("lat", lat);
    }
    if (lon !== undefined && lon !== null) {
      formData.append("lon", lon);
    }

    const response = await fetch(ENDPOINTS.STORIES, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    const responseJson = await response.json();

    if (!response.ok) {
      return { error: true, data: responseJson };
    }

    return { error: false, data: responseJson };
  } catch (error) {
    return { error: true, data: { message: "Network error" } };
  }
}
