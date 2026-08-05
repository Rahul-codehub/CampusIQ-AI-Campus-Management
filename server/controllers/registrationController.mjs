import { getAuthUser } from "../middleware/authMiddleware.mjs";

import {
    send,
    sendError,
    parseBody,
} from "../utils/response.mjs";

import {
    getPendingRequests,
    approveRequest,
    rejectRequest,
} from "../services/approvalService.mjs";

export async function handleRegistrationRequest(
    req,
    res,
    pathParts
) {
    try {
        const user = await getAuthUser(req);

        if (!user) {
            return sendError(
                res,
                401,
                "Authentication required."
            );
        }

        
        /* =========================================
   PERMISSIONS
========================================= */

const isAdmin =
    (user.roles || []).includes("admin");

const isFaculty =
    (user.roles || []).includes("faculty");

if (!isAdmin && !isFaculty) {
    return sendError(
        res,
        403,
        "You do not have permission to manage registration requests."
    );
}
        /* ===========================
           GET Pending Requests
        =========================== */

        if (req.method === "GET") {
            const requests =
                await getPendingRequests();

            return send(res, 200, {
                data: requests,
            });
        }

        /* ===========================
           APPROVE REQUEST
        =========================== */

        if (
            req.method === "POST" &&
            pathParts[2] === "approve"
        ) {
            const { requestId } =
                await parseBody(req);

            const result =
    await approveRequest(
        requestId,
        user
    );

            return send(res, 200, result);
        }

        /* ===========================
           REJECT REQUEST
        =========================== */

        if (
            req.method === "POST" &&
            pathParts[2] === "reject"
        ) {
            const { requestId } =
                await parseBody(req);

            const result =
    await rejectRequest(
        requestId,
        user
    );

            return send(res, 200, result);
        }

        return sendError(
            res,
            405,
            "Method not allowed."
        );
    } catch (error) {
        console.error(error);

        return sendError(
            res,
            500,
            error.message
        );
    }
}