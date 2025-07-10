export interface PresentationData {
    ppt_iframe_src: string;
}

export interface PresentationResponse {
    success: boolean;
    message: string;
    developer_note: string;
    data?: PresentationData;
}

export interface PresentationServiceResponse {
    status: boolean;
    msg: string;
    data?: PresentationData;
} 