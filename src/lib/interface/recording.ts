export interface RecordingResponse {
    success: boolean;
    message: string;
    recording_url: string;
    download_url: string;
    recording_note: string;
    developer_note: string;
}

export interface RecordingServiceResponse {
    status: boolean;
    msg: string;
    data?: RecordingResponse;
} 